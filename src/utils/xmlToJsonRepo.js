import xml2js from 'xml2js'

export default async xmlString => {
  const parser = new xml2js.Parser();
  const raw = await parser.parseStringPromise(xmlString);

  const converted = {
    categories: [],
    information: []
  };
  if (!raw.emoji) {
    return converted
  }
  const emoji = raw.emoji;

  if (emoji.infoos) {
    converted.information = emoji.infoos.map(xmlInfo => {
      return xmlInfo.info
    })
  }

  if (emoji.category) {
    converted.categories = emoji.category.map(xmlCategory => {
      const category = {
        name: '',
        entries: []
      };
      if (xmlCategory.$ && xmlCategory.$.name) {
        category.name = xmlCategory.$.name
      }
      if (xmlCategory.entry) {
        category.entries = xmlCategory.entry.map(xmlEntry => {
          const entry = {
            emoticon: '',
            description: ''
          };
          if (xmlEntry.string) {
            entry.emoticon = xmlEntry.string[0]
          }
          if (xmlEntry.note) {
            entry.description = xmlEntry.note[0]
          }
          return entry
        })
      }
      return category
    })
  }

  return converted
}
