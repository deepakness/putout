/*
    This file all existing themes and also lets you create new themes.

    Comments (like this one or that starts with //) will help you know what a line of code does.
    Read the comment and make changes accordingly.

    You don't need to change these comment lines unless you are modifying the setting itself. 
*/

module.exports = {
  default: {
    body: 'bg-white text-gray-900',
    header: 'bg-gray-100 text-gray-900',
    card: 'bg-gray-50 border border-gray-200 shadow-sm',
    button: 'bg-gray-200 text-gray-900 hover:bg-gray-300 border border-gray-300',
    prose: 'prose',
    icons: 'text-gray-500 hover:text-gray-900 transition-colors duration-300'
  },
  glass: {
    body: 'bg-gradient-to-br from-blue-500 to-purple-600 text-white bg-fixed',
    header: 'bg-white bg-opacity-10 backdrop-blur-md border-b border-white border-opacity-20',
    card: 'bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 shadow-lg',
    button: 'bg-white bg-opacity-20 backdrop-blur-md border border-white border-opacity-20 text-white hover:bg-opacity-30',
    prose: 'prose prose-invert',
    icons: 'text-gray-300 hover:text-white transition-colors duration-300'
  },
  dark: {
    body: 'bg-gray-900 text-gray-100',
    header: 'bg-gray-800 text-gray-100',
    card: 'bg-gray-800 border border-gray-700 shadow-md',
    button: 'bg-gray-700 text-gray-100 hover:bg-gray-600 border border-gray-600',
    prose: 'prose prose-invert',
    icons: 'text-gray-400 hover:text-gray-200 transition-colors duration-300'
  },
  purple: {
    body: 'bg-white text-gray-900',
    header: 'bg-purple-100 text-gray-900',
    card: 'bg-purple-50 border border-purple-200 shadow-sm',
    button: 'bg-purple-100 text-gray-900 hover:bg-purple-200 border border-purple-300',
    prose: 'prose',
    icons: 'text-purple-400 hover:text-purple-900 transition-colors duration-300'
  },
  warm: {
    body: 'bg-orange-50 text-orange-900',
    header: 'bg-orange-100 text-orange-900',
    card: 'bg-white border border-orange-200 shadow-sm',
    button: 'bg-orange-200 text-orange-900 hover:bg-orange-300 border border-orange-300',
    prose: 'prose prose-orange font-serif text-lg',
    icons: 'text-orange-400 hover:text-orange-900 transition-colors duration-300'
  },
};