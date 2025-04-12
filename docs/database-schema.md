# Database Schema (Firestore)

## Collection: brands/{brandId}
- name: string
- admins: string[] (UIDs)

### Subcollections:
- `items/{itemId}`
- `tasks/{taskId}`
- `clients/{clientId}`
- `quotes/{quoteId}`

## Collection: users/{userId}
- uid: string
- email: string
- role: "admin" | "worker"
- brandId: string