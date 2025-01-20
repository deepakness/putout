const puppeteer = require('puppeteer');
const Epub = require('epub-gen');
const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');
const site = require('../src/_data/site.js');

const md = new MarkdownIt();

async function getChapterContent() {
    const chaptersDir = path.join(__dirname, '../src/chapters');
    const files = fs.readdirSync(chaptersDir)
        .filter(file => file.endsWith('.md'))
        .sort((a, b) => {
            const numA = parseInt(a.match(/\d+/)[0]);
            const numB = parseInt(b.match(/\d+/)[0]);
            return numA - numB;
        });

    const chapters = [];
    for (const file of files) {
        const content = fs.readFileSync(path.join(chaptersDir, file), 'utf-8');
        
        // Extract title from frontmatter
        const titleMatch = content.match(/title:\s*"([^"]+)"/);
        const title = titleMatch ? titleMatch[1] : '';
        
        // Remove frontmatter (content between --- markers)
        const cleanContent = content.replace(/^---[\s\S]*?---\n/, '');
        
        // Convert markdown to HTML
        const htmlContent = md.render(cleanContent);
        
        chapters.push({
            title: title,
            data: htmlContent
        });
    }
    return chapters;
}

async function generatePDF() {
    if (!site.formats.pdf) return;
    
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    // Create a temporary HTML file with all chapters
    const chapters = await getChapterContent();
    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>${site.title}</title>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap');
                
                body { 
                    font-family: 'Merriweather', serif;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                    line-height: 1.8;
                    font-size: 12pt;
                }
                
                h1 { 
                    text-align: center;
                    margin-bottom: 60px;
                    margin-top: 40px;
                    font-size: 32pt;
                    font-weight: 700;
                    line-height: 1.2;
                }
                
                .chapter { 
                    margin-bottom: 30px;
                    page-break-before: always;
                }
                
                .chapter:first-child { 
                    page-break-before: avoid;
                }
                
                .chapter-title { 
                    font-size: 24pt;
                    margin-bottom: 30px;
                    margin-top: 40px;
                    text-align: center;
                    font-weight: 700;
                    line-height: 1.3;
                }

                p {
                    margin-bottom: 1.2em;
                    text-align: justify;
                }

                h2, h3, h4 {
                    margin-top: 1.5em;
                    margin-bottom: 0.8em;
                    line-height: 1.4;
                }

                h2 { font-size: 18pt; }
                h3 { font-size: 16pt; }
                h4 { font-size: 14pt; }

                ul, ol {
                    margin-bottom: 1.2em;
                    padding-left: 2em;
                }

                li {
                    margin-bottom: 0.5em;
                }
            </style>
        </head>
        <body>
            <h1>${site.longTitle || site.title}</h1>
            ${chapters.map(chapter => `
                <div class="chapter">
                    <h2 class="chapter-title">${chapter.title}</h2>
                    ${chapter.data}
                </div>
            `).join('')}
        </body>
        </html>
    `;

    const tempHtmlPath = path.join(__dirname, '../dist/temp.html');
    fs.writeFileSync(tempHtmlPath, html);

    await page.goto(`file://${tempHtmlPath}`);
    await page.pdf({
        path: path.join(__dirname, '../dist/book.pdf'),
        format: 'A4',
        margin: { top: '2.5cm', right: '2.5cm', bottom: '2.5cm', left: '2.5cm' },
        printBackground: true
    });

    fs.unlinkSync(tempHtmlPath);
    await browser.close();
}

async function generateEPUB() {
    if (!site.formats.epub) return;

    const chapters = await getChapterContent();
    const coverPath = path.join(__dirname, '../src', site.coverImage);
    
    // Check if cover image exists
    if (!fs.existsSync(coverPath)) {
        console.warn('Warning: Cover image not found at', coverPath);
    }

    const options = {
        title: site.title,
        author: site.author,
        publisher: site.author,
        cover: coverPath,
        content: chapters.map(chapter => ({
            title: chapter.title,
            data: chapter.data,
            beforeToc: chapter === chapters[0] // Only first chapter appears before TOC
        })),
        css: `
            body {
                font-family: 'Merriweather', serif;
                line-height: 1.8;
                font-size: 1.1em;
            }
            h1 {
                text-align: center;
                font-size: 2em;
                margin: 1em 0;
                line-height: 1.2;
            }
            h2 {
                text-align: center;
                font-size: 1.5em;
                margin: 1em 0;
                line-height: 1.3;
            }
            p {
                margin: 1em 0;
                text-align: justify;
            }
            .chapter {
                margin: 2em 0;
            }
        `
    };

    await new Epub(options, path.join(__dirname, '../dist/book.epub')).promise;
}

async function main() {
    try {
        const distDir = path.join(__dirname, '../dist');
        // Ensure dist directory exists
        if (!fs.existsSync(distDir)) {
            fs.mkdirSync(distDir, { recursive: true });
        }

        await generatePDF();
        await generateEPUB();
        console.log('Book formats generated successfully!');
    } catch (error) {
        console.error('Error generating book formats:', error);
        process.exit(1);
    }
}

main(); 