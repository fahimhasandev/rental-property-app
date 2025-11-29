export function convertToSerializableObject(leadDocument) {
  for (const key of Object.keys(leadDocument)) {
    if (leadDocument[key].toJSON && leadDocument[key].toString) {
      leadDocument[key] = leadDocument[key].toString();
    }
  }

  return leadDocument
}
