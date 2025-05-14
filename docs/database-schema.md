# Database Schema (Firestore)

## Collection: /atelier/pdf/brands/{brandId}
- name: string
- admins: string[] (UIDs)

### Subcollections:
- `items/{itemId}`
- `tasks/{taskId}`
- `clients/{clientId}`
- `quotes/{quoteId}`
- `staff/{staffId}`
- `stores/{storeId}`

## Collection: /atelier/pdf/users/{userId}
- uid: string
- email: string
- role: "admin" | "worker"
- brandId: string