export enum CollectionColors {
  huckleberry = "bg-gradient-to-r from-purple-200 via-purple-400 to-purple-800",
  spearmint = "bg-gradient-to-r from-green-200 via-green-400 to-green-500",
  arendelle = "bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500",
  minnesota = "bg-gradient-to-r from-purple-400 to-yellow-400",
  hawaii = "bg-gradient-to-r from-green-300 via-yellow-300 to-pink-300",
  lavender = "bg-gradient-to-r from-indigo-300 to-purple-400",
  paradise = "bg-gradient-to-r from-blue-300 via-green-200 to-yellow-300",
  strawberry = "bg-gradient-to-r from-yellow-200 via-pink-200 to-pink-400",
}

export type CollectionColor = keyof typeof CollectionColors;
