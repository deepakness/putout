const puppeteer = require('puppeteer');
const epub = require('epub-gen-memory').default;
const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');
const matter = require('gray-matter');
const site = require('../src/_data/site.js');

const md = new MarkdownIt();

function getChapterContent() {
    const chaptersDir = path.join(__dirname, '../src/chapters');
    const files = fs.readdirSync(chaptersDir)
        .filter(file => file.endsWith('.md') && !file.startsWith('_'))
        .sort((a, b) => {
            const numA = parseInt(a.match(/\d+/)[0]);
            const numB = parseInt(b.match(/\d+/)[0]);
            return numA - numB;
        });

    const chapters = [];
    for (const file of files) {
        const raw = fs.readFileSync(path.join(chaptersDir, file), 'utf-8');
        const { data, content } = matter(raw);
        const title = data.title || '';
        const htmlContent = md.render(content);

        chapters.push({
            title: title,
            content: htmlContent
        });
    }
    return chapters;
}

async function generatePDF(chapters) {
    if (!site.formats.pdf) return;

    const browser = await puppeteer.launch({ headless: 'shell' });
    const tempHtmlPath = path.join(__dirname, '../dist/temp.html');

    try {
        const page = await browser.newPage();

        const bodyFont = site.fonts.body || 'Merriweather';
        const headingFont = site.fonts.heading || 'Inter';

        // Build table of contents
        const tocHtml = chapters.map(function (ch, i) {
            return '<li style="margin-bottom: 0.5em;"><a href="#chapter-' + (i + 1) + '" style="text-decoration: none; color: #333;">' +
                '<span style="font-weight: 600;">Chapter ' + (i + 1) + ':</span> ' + ch.title + '</a></li>';
        }).join('\n');

        const html = '<!DOCTYPE html>\n' +
            '<html>\n' +
            '<head>\n' +
            '    <title>' + site.title + '</title>\n' +
            '    <style>\n' +
            '        @import url(\'https://fonts.googleapis.com/css2?family=' + bodyFont.replace(/\s+/g, '+') + ':wght@400;700&family=' + headingFont.replace(/\s+/g, '+') + ':wght@400;600;700&display=swap\');\n' +
            '\n' +
            '        body {\n' +
            '            font-family: \'' + bodyFont + '\', serif;\n' +
            '            max-width: 800px;\n' +
            '            margin: 0 auto;\n' +
            '            padding: 20px;\n' +
            '            line-height: 1.8;\n' +
            '            font-size: 12pt;\n' +
            '        }\n' +
            '\n' +
            '        h1 {\n' +
            '            font-family: \'' + headingFont + '\', sans-serif;\n' +
            '            text-align: center;\n' +
            '            margin-bottom: 60px;\n' +
            '            margin-top: 40px;\n' +
            '            font-size: 32pt;\n' +
            '            font-weight: 700;\n' +
            '            line-height: 1.2;\n' +
            '        }\n' +
            '\n' +
            '        .toc {\n' +
            '            page-break-after: always;\n' +
            '        }\n' +
            '\n' +
            '        .toc h2 {\n' +
            '            font-family: \'' + headingFont + '\', sans-serif;\n' +
            '            text-align: center;\n' +
            '            font-size: 22pt;\n' +
            '            margin-bottom: 30px;\n' +
            '            font-weight: 700;\n' +
            '        }\n' +
            '\n' +
            '        .toc ol {\n' +
            '            list-style: none;\n' +
            '            padding: 0;\n' +
            '            max-width: 500px;\n' +
            '            margin: 0 auto;\n' +
            '            font-size: 13pt;\n' +
            '            line-height: 2;\n' +
            '        }\n' +
            '\n' +
            '        .chapter {\n' +
            '            margin-bottom: 30px;\n' +
            '            page-break-before: always;\n' +
            '        }\n' +
            '\n' +
            '        .chapter-title {\n' +
            '            font-family: \'' + headingFont + '\', sans-serif;\n' +
            '            font-size: 24pt;\n' +
            '            margin-bottom: 30px;\n' +
            '            margin-top: 40px;\n' +
            '            text-align: center;\n' +
            '            font-weight: 700;\n' +
            '            line-height: 1.3;\n' +
            '        }\n' +
            '\n' +
            '        p {\n' +
            '            margin-bottom: 1.2em;\n' +
            '            text-align: justify;\n' +
            '        }\n' +
            '\n' +
            '        h2, h3, h4 {\n' +
            '            font-family: \'' + headingFont + '\', sans-serif;\n' +
            '            margin-top: 1.5em;\n' +
            '            margin-bottom: 0.8em;\n' +
            '            line-height: 1.4;\n' +
            '        }\n' +
            '\n' +
            '        h2 { font-size: 18pt; }\n' +
            '        h3 { font-size: 16pt; }\n' +
            '        h4 { font-size: 14pt; }\n' +
            '\n' +
            '        ul, ol {\n' +
            '            margin-bottom: 1.2em;\n' +
            '            padding-left: 2em;\n' +
            '        }\n' +
            '\n' +
            '        li {\n' +
            '            margin-bottom: 0.5em;\n' +
            '        }\n' +
            '    </style>\n' +
            '</head>\n' +
            '<body>\n' +
            '    <h1>' + (site.longTitle || site.title) + '</h1>\n' +
            '    <div class="toc">\n' +
            '        <h2>Table of Contents</h2>\n' +
            '        <ol>' + tocHtml + '</ol>\n' +
            '    </div>\n' +
            chapters.map(function (chapter, i) {
                return '    <div class="chapter" id="chapter-' + (i + 1) + '">\n' +
                    '        <h2 class="chapter-title">' + chapter.title + '</h2>\n' +
                    '        ' + chapter.content + '\n' +
                    '    </div>';
            }).join('\n') +
            '\n</body>\n</html>';

        fs.writeFileSync(tempHtmlPath, html);

        await page.goto('file://' + tempHtmlPath, { waitUntil: 'networkidle0' });
        await page.pdf({
            path: path.join(__dirname, '../dist/book.pdf'),
            format: 'A4',
            margin: { top: '2.5cm', right: '2.5cm', bottom: '2.5cm', left: '2.5cm' },
            printBackground: true,
            displayHeaderFooter: true,
            headerTemplate: '<span></span>',
            footerTemplate: '<div style="width: 100%; text-align: center; font-size: 9pt; color: #999; font-family: sans-serif;"><span class="pageNumber"></span></div>'
        });
    } finally {
        try { fs.unlinkSync(tempHtmlPath); } catch (e) { /* ignore if already deleted */ }
        await browser.close();
    }
}

async function generateEPUB(chapters) {
    if (!site.formats.epub) return;

    const coverPath = path.join(__dirname, '../src', site.coverImage);

    // Check if cover image exists
    if (!fs.existsSync(coverPath)) {
        console.warn('Warning: Cover image not found at', coverPath);
    }

    const bodyFont = site.fonts.body || 'Merriweather';

    const options = {
        title: site.title,
        author: site.author,
        publisher: site.author,
        cover: fs.existsSync(coverPath) ? coverPath : undefined,
        css: '\n' +
            '            body {\n' +
            '                font-family: \'' + bodyFont + '\', serif;\n' +
            '                line-height: 1.8;\n' +
            '                font-size: 1.1em;\n' +
            '            }\n' +
            '            h1 {\n' +
            '                text-align: center;\n' +
            '                font-size: 2em;\n' +
            '                margin: 1em 0;\n' +
            '                line-height: 1.2;\n' +
            '            }\n' +
            '            h2 {\n' +
            '                text-align: center;\n' +
            '                font-size: 1.5em;\n' +
            '                margin: 1em 0;\n' +
            '                line-height: 1.3;\n' +
            '            }\n' +
            '            p {\n' +
            '                margin: 1em 0;\n' +
            '                text-align: justify;\n' +
            '            }\n' +
            '            .chapter {\n' +
            '                margin: 2em 0;\n' +
            '            }\n' +
            '        '
    };

    const epubChapters = chapters.map(function (chapter) {
        return {
            title: chapter.title,
            content: chapter.content,
        };
    });

    const epubBuffer = await epub(options, epubChapters);
    fs.writeFileSync(path.join(__dirname, '../dist/book.epub'), epubBuffer);
}

async function main() {
    try {
        const distDir = path.join(__dirname, '../dist');
        // Ensure dist directory exists
        if (!fs.existsSync(distDir)) {
            fs.mkdirSync(distDir, { recursive: true });
        }

        // Read chapter content once, share between PDF and EPUB
        const chapters = getChapterContent();

        await generatePDF(chapters);
        await generateEPUB(chapters);
        console.log('Book formats generated successfully!');
    } catch (error) {
        console.error('Error generating book formats:', error);
        process.exit(1);
    }
}

main();
