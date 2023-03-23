export type NewestStoryT = {
  coverImage: string
  name: string
  chapter?: number
  star?: number
  price?: number
  categories: CategoryStoryT[]
  createAt: Date
  updateAt: Date
}

export type CategoryStoryT = {
  id: number
  name: string
}

export const categories: CategoryStoryT[] = [
  {
    id: 1,
    name: 'Hành động',
  },
  {
    id: 2,
    name: 'Phiêu lưu',
  },
  {
    id: 3,
    name: 'Hài hước',
  },
  {
    id: 4,
    name: 'Kịch tính',
  },
  {
    id: 5,
    name: 'Siêu nhiên',
  },
  {
    id: 6,
    name: 'Hậu cung',
  },
  {
    id: 7,
    name: 'Lãng mạn',
  },
  {
    id: 8,
    name: 'Trường học',
  },
  {
    id: 9,
    name: 'Viễn tưởng',
  },
  {
    id: 10,
    name: 'Đời thường',
  },
  {
    id: 11,
    name: 'Game',
  },
  {
    id: 12,
    name: 'Thể thao',
  },
  {
    id: 13,
    name: 'Đam mỹ',
  },
  {
    id: 14,
    name: 'Yuri',
  },
  {
    id: 15,
    name: 'Phép thuật',
  },
  {
    id: 16,
    name: 'Âm nhạc',
  },
  {
    id: 17,
    name: 'Robot',
  },
  {
    id: 18,
    name: 'Trinh thám',
  },
  {
    id: 19,
    name: 'Ẩm thực',
  },
  {
    id: 20,
    name: 'Kịnh dị',
  },
  {
    id: 21,
    name: 'Lịch sử',
  },
]

export const stories: NewestStoryT[] = [
  {
    coverImage:
      'https://s3-alpha-sig.figma.com/img/b069/ce9d/c6e0b2e34d10f06c1e4084553e6e62ce?Expires=1680480000&Signature=hpPDGg4OAgJhW0h6-IY8-XfyRNKau5us8tGcXfiErotpIiMc2hw5irJohKBRP-WS-~eVWjkqOgVx8O~w0-L3m4uBOLp~TpMW~X4ypkuHoIaEzupUFEE3~eLH3Xo50msTlbVEv~hgpV3wrhMCgxGSpjtYXwnL-PWvW578asdk10RbfjkwPjIS4~x~Hqbok4vrjwKQUy2misR63QVuHnrUmQaKQgUBO75Zinuqnl-tNIlsvNseJmOVDFajdEwqsKP1Dh5aFZgdajTiohRJwoIZ4IVWhGUVqhn3w~0D5VFKSSuriCsb8cLFCuMiDYuw79sdox4gCFs6GtwFERkpKZYAAA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    name: 'One piece',
    chapter: 1075,
    star: 5,
    price: 0,
    categories: [categories[2], categories[4], categories[7]],
    createAt: new Date('16-03-2023'),
    updateAt: new Date('16-03-2023'),
  },
  {
    coverImage:
      'https://s3-alpha-sig.figma.com/img/4fca/03ee/91f4a953e492bdfe378fe61ca4d6f02e?Expires=1680480000&Signature=oVFBoBdvuUOOiAt63Mf0TBVM7COUGAYxPdGJlxKbJWIIZem2u0DyeU6GAY0z53C5uQTVdfPrYoleOLIRkM-fkKRRgreppslTZidRFJA6~6zGQ58cuAO-XY05ML~k-8K~81eb22DdjwX4JhJwwF9keLNbomXtKXjCBJJOlB~8mth~2BcXywfj7rCEhdo8nqooRDeGxCxfWrc4LHoLv71BzicpaGLbGKpVgSYJpr5eOCI3GrPv-t3M8rVC950rr5LmKteQ-jLb5go4Fe7DploVBrZVMpNYn2oT7xEOBSvZtI6OONu6tRO9spGF-k6t1acD76YJYDfMeUFhPlHctL0RpQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    name: '7 viên ngọc rồng',
    chapter: 510,
    star: 1,
    price: 0,
    categories: [categories[10]],
    createAt: new Date('16-03-2023'),
    updateAt: new Date('17-03-2023'),
  },
  {
    coverImage:
      'https://s3-alpha-sig.figma.com/img/9e83/356e/d2f115d902ad0d2e97d2c74f973beb35?Expires=1680480000&Signature=asXEnEWZDWvWGmIAXEkGTmL42-iOuSjYXcyfn0Ve05Kn2mrd3eZWpERubnR72YEHozo~qNJTf2g8nOiVPR6mJ-X00LFCdYhMhwUoImhYlC3OuAuA8qcNVZn95cXHXeUjUJy2F-56UlZn35VX3GwwTMxN5LYAGhHxXiSrkXqHpqEWXWBjOTfZEHUcWyb2NDr5D3lGuMMuS6z1nLTXbfSjERcio-UIrR-xBMoVpEVZY6a~gH9QoiWWLJ23IVHY4oRbyTPtcG-ziOLNbk-nif7yz97VMYvmrcJFwil9YxVvBxvohhY9FwQB7Ot9nT3AQUUJCp5lY4asJYounb776TGRcQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    name: 'Conan',
    chapter: 1555,
    star: 4,
    price: 0,
    categories: [categories[21]],
    createAt: new Date('16-03-2023'),
    updateAt: new Date('18-03-2023'),
  },
  {
    coverImage:
      'https://s3-alpha-sig.figma.com/img/9788/8d5d/b3065b867d31130a689abfd488f83f40?Expires=1680480000&Signature=qgv6iPrP~JBBbthJIjyjE~Z8YxOLjfrBTe~Rr8GwPt26q4HABV6V02RyFeyg2pjaIoHL8NpAZuS5CsuDI07C2mQ7-Vsh6zdbuhQSGmQqtqxeBTcQ0OQQtkF2EXYdSVohq2-iitY7091ydVSNUZK-3oO3saWMrlLr4N3a7jfkWMQGgg72-SmDX-Vqb9afDHOsQ2W9mkVwEomftUYGJ~F0q0xth9MR4ljKbE97srjFTP64mNrDSKriV3ucKdGtdtU-sQQBt~MHxc2b702vrTbetX7eSLjSo10QSq2r5HeGd1RC5qVzQQBmybc~Z2DZWxVy94lhUTKxViSZqV-MkCa75A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    name: 'One punch man',
    chapter: 709,
    star: 4,
    price: 0,
    categories: [categories[19]],
    createAt: new Date('16-03-2023'),
    updateAt: new Date('20-03-2023'),
  },
  {
    coverImage:
      'https://s3-alpha-sig.figma.com/img/b069/ce9d/c6e0b2e34d10f06c1e4084553e6e62ce?Expires=1680480000&Signature=hpPDGg4OAgJhW0h6-IY8-XfyRNKau5us8tGcXfiErotpIiMc2hw5irJohKBRP-WS-~eVWjkqOgVx8O~w0-L3m4uBOLp~TpMW~X4ypkuHoIaEzupUFEE3~eLH3Xo50msTlbVEv~hgpV3wrhMCgxGSpjtYXwnL-PWvW578asdk10RbfjkwPjIS4~x~Hqbok4vrjwKQUy2misR63QVuHnrUmQaKQgUBO75Zinuqnl-tNIlsvNseJmOVDFajdEwqsKP1Dh5aFZgdajTiohRJwoIZ4IVWhGUVqhn3w~0D5VFKSSuriCsb8cLFCuMiDYuw79sdox4gCFs6GtwFERkpKZYAAA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    name: 'One piece',
    chapter: 1075,
    star: 3,
    price: 0,
    categories: [categories[4]],
    createAt: new Date('16-03-2023'),
    updateAt: new Date('19-03-2023'),
  },
  {
    coverImage:
      'https://s3-alpha-sig.figma.com/img/4aef/b144/59f92db42317540627b22f29749b3b0d?Expires=1680480000&Signature=EdBlfbLM7iPGcdBfDHNkTVpfdrt7iwWAduXJ8TzQUraCoI8H5L7Kgtty4OMishJd-jiPosOF7eu3i09cEXBdP-o9CG5P565qwcV42Ui5XeDkvyuI6B9U9LLXHHS9Ogb5N2DSDt3h1bK0iDkh0Rggvn0vTibrNJeoXgxHWU8-C36L6WaiAeaqf4EPnzgk5YEwR9j51uOAJawDGtGRSQFTWrekPLNuUDmLsTp~7R9s6fwPcD2VDeB0~tp~sMZz6gJUVrNofsvBQbcdHHLSDNPzaqxoPA09WEmeNzeab~4DulZlAGKd7jODH4XMTBdW7iiK03SI8a67lND3etS8GwqxsQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    name: 'Kimetsu no yaiba',
    chapter: 687,
    star: 5,
    price: 0,
    categories: [categories[1]],
    createAt: new Date('16-03-2023'),
    updateAt: new Date('25-03-2023'),
  },
  {
    coverImage:
      'https://s3-alpha-sig.figma.com/img/9e83/356e/d2f115d902ad0d2e97d2c74f973beb35?Expires=1680480000&Signature=asXEnEWZDWvWGmIAXEkGTmL42-iOuSjYXcyfn0Ve05Kn2mrd3eZWpERubnR72YEHozo~qNJTf2g8nOiVPR6mJ-X00LFCdYhMhwUoImhYlC3OuAuA8qcNVZn95cXHXeUjUJy2F-56UlZn35VX3GwwTMxN5LYAGhHxXiSrkXqHpqEWXWBjOTfZEHUcWyb2NDr5D3lGuMMuS6z1nLTXbfSjERcio-UIrR-xBMoVpEVZY6a~gH9QoiWWLJ23IVHY4oRbyTPtcG-ziOLNbk-nif7yz97VMYvmrcJFwil9YxVvBxvohhY9FwQB7Ot9nT3AQUUJCp5lY4asJYounb776TGRcQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    name: 'Conan',
    chapter: 1555,
    star: 4,
    price: 0,
    categories: [categories[21], categories[2]],
    createAt: new Date('16-03-2023'),
    updateAt: new Date('29-03-2023'),
  },
  {
    coverImage:
      'https://s3-alpha-sig.figma.com/img/b069/ce9d/c6e0b2e34d10f06c1e4084553e6e62ce?Expires=1680480000&Signature=hpPDGg4OAgJhW0h6-IY8-XfyRNKau5us8tGcXfiErotpIiMc2hw5irJohKBRP-WS-~eVWjkqOgVx8O~w0-L3m4uBOLp~TpMW~X4ypkuHoIaEzupUFEE3~eLH3Xo50msTlbVEv~hgpV3wrhMCgxGSpjtYXwnL-PWvW578asdk10RbfjkwPjIS4~x~Hqbok4vrjwKQUy2misR63QVuHnrUmQaKQgUBO75Zinuqnl-tNIlsvNseJmOVDFajdEwqsKP1Dh5aFZgdajTiohRJwoIZ4IVWhGUVqhn3w~0D5VFKSSuriCsb8cLFCuMiDYuw79sdox4gCFs6GtwFERkpKZYAAA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    name: 'One piece',
    chapter: 1075,
    star: 5,
    price: 0,
    categories: [categories[12]],
    createAt: new Date('16-03-2023'),
    updateAt: new Date('23-03-2023'),
  },
  {
    coverImage:
      'https://s3-alpha-sig.figma.com/img/b069/ce9d/c6e0b2e34d10f06c1e4084553e6e62ce?Expires=1680480000&Signature=hpPDGg4OAgJhW0h6-IY8-XfyRNKau5us8tGcXfiErotpIiMc2hw5irJohKBRP-WS-~eVWjkqOgVx8O~w0-L3m4uBOLp~TpMW~X4ypkuHoIaEzupUFEE3~eLH3Xo50msTlbVEv~hgpV3wrhMCgxGSpjtYXwnL-PWvW578asdk10RbfjkwPjIS4~x~Hqbok4vrjwKQUy2misR63QVuHnrUmQaKQgUBO75Zinuqnl-tNIlsvNseJmOVDFajdEwqsKP1Dh5aFZgdajTiohRJwoIZ4IVWhGUVqhn3w~0D5VFKSSuriCsb8cLFCuMiDYuw79sdox4gCFs6GtwFERkpKZYAAA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    name: 'One piece piece piece piece piece',
    chapter: 1075,
    star: 5,
    price: 0,
    categories: [categories[11]],
    createAt: new Date('16-03-2023'),
    updateAt: new Date('21-03-2023'),
  },
]

export const newestStory = stories
  .slice()
  .sort((a, b) => +b.updateAt - +a.updateAt)
