const data = require('./dummy.json');
const ROW_TYPES = {
  TEXT: 'text',
  HEADING1: 'heading1',
  HEADING2: 'heading2',
  HEADING3: 'heading3',
  TODOS: 'todos',
  HR: 'hr',
  BLOCKQUOTE: 'blockquote',
  BULLETS: 'bullets',
  NUMBERS: 'numbers',
  IMAGE: 'image',
}

const STYLE_TYPES = {
  BOLD: 'bold',
  ITALIC: 'italic',
  UNDERLINE: 'underline',
  STRIKETHROUGH: 'strikethrough',
  CODE: 'code',
  LINK: 'link',
}

const getBlockType = type => {
  if (type === 'unordered-list-item') {
    return ROW_TYPES.BULLETS
  }
  
  if (type === 'ordered-list-item') {
    return ROW_TYPES.NUMBERS
  }
  
  return ROW_TYPES.TEXT
}

const parseRawBlock = block => {
  const {text, inlineStyleRanges, type} = block

  if(!text || !text.length) {
    return { row: [ { text: '' } ], type: getBlockType(type), text: '' }
  }
  const result = []

  let styleOffsets = []

  inlineStyleRanges.forEach(inlineStyleRange => {
    styleOffsets.push(inlineStyleRange['offset'])
    styleOffsets.push(inlineStyleRange['length'] + inlineStyleRange['offset'])
  })

  styleOffsets = styleOffsets.filter((item, pos) => {
    return styleOffsets.indexOf(item) == pos; 
  });
  

  styleOffsets.sort((a, b) => a - b)

  const firstIndex = styleOffsets[0]
  if(firstIndex > 0) {
    const item = {
      text: text.substring(0, firstIndex),
    }
    result.push(item)
  }

  styleOffsets.forEach((a, index) => {
    const b = styleOffsets[index+1]
    if(b) {
      const item = {
        styles: []
      }

      inlineStyleRanges.forEach(inlineStyleRange => {
        const start = inlineStyleRange['offset']
        const end = inlineStyleRange['length'] + inlineStyleRange['offset']

        if(start >= a && b <= end ) {
          item.text = text.substring(a, b)
          if(inlineStyleRange.style) {
            item.styles.push(inlineStyleRange.style.toLowerCase())
          }
        }
      })

      result.push(item)
    }
  })
  console.log(result);
}

const convertToMarkdown = ({ rows = [] }) => {
  let markdown = ''

  rows.forEach(row => {
    const { blocks = [], type } = row
    if(!row.value) {
      markdown += `\n\n`
    }
    
    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];

      let { text: blockText = '', styles = [] } = block

      if(!blockText || !blockText.length || blockText === '') {
        continue
      }

      styles = styles.filter((style, i) => styles.indexOf(style) === i);

      if( styles.includes(STYLE_TYPES.BOLD) && styles.includes(STYLE_TYPES.ITALIC)  && styles.includes(STYLE_TYPES.UNDERLINE))  {
        blockText = `__***${blockText}***__`
      } else if (styles.includes(STYLE_TYPES.BOLD) && styles.includes(STYLE_TYPES.ITALIC)) {
        blockText = `***${blockText}***`
      } else if (styles.includes(STYLE_TYPES.BOLD) && styles.includes(STYLE_TYPES.UNDERLINE)) {
        blockText = `__**${blockText}**__`
      } else if (styles.includes(STYLE_TYPES.ITALIC) && styles.includes(STYLE_TYPES.UNDERLINE)) {
        blockText = `__*${blockText}*__`
      } else if (styles.includes(STYLE_TYPES.BOLD) && styles.length === 1) {
        blockText = `**${blockText}**`
      } else if (styles.includes(STYLE_TYPES.ITALIC) && styles.length === 1) {
        blockText = `*${blockText}*`
      } else if (styles.includes(STYLE_TYPES.UNDERLINE) && styles.length === 1) {
        blockText = `__${blockText}__`
      }        

      if(type === ROW_TYPES.HEADING1) {
        blockText = `# ${blockText}`
      } else if (type === ROW_TYPES.HEADING2) {
        blockText = `## ${blockText}`
      } else if (type === ROW_TYPES.HEADING3) {
        blockText = `### ${blockText}`
      } else if ( type === ROW_TYPES.BULLETS ) {
        blockText = `* ${blockText}`
      } else if ( type === ROW_TYPES.BLOCKQUOTE ) {
        blockText = `> ${blockText}`
      }

      markdown += blockText

      if(blocks.length-1 === i) {
        markdown += `\n\n`
      }
    }
    
  })

  console.log(markdown)

  return markdown
}

// convertToMarkdown({ rows: [data]});
parseRawBlock(data.blocks[3])