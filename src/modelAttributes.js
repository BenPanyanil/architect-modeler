export const modelAttributes = {
  "basics": [
    "description",
  ],
  "class": [
    ...modelAttributes.basics,
    "constructor",
    "method",
  ],
  "class-instance": [
    ...modelAttributes.basics,
    "Class",
    "method",
  ]
}

export default modelAttributes

