# Company Express Backend

Backend starter for a corporate website. Built with Express 4, MongoDB/Mongoose, JWT, Formidable **2.1.1**, and Cloudinary.

## Setup
1. Install Node.js 18+ and MongoDB.
2. `npm install`
3. Copy `.env.example` to `.env` and fill in MongoDB, JWT, and Cloudinary credentials.
4. `npm run dev`

Base URL: `http://localhost:5000/api`

## Main models and relationships
- `User`: roles `user`, `support`, `editor`, `admin`.
- `ProjectCategory` 1-to-many `Project`; `Project.createdBy` -> `User`.
- `ArticleCategory` 1-to-many `Article`; `Article.author` -> `User`.
- `Contact.handledBy` -> `User`.
- `Department` 1-to-many `Ticket`; `Ticket.owner` and `Ticket.assignedTo` -> `User`.
- `TicketMessage.ticket` -> `Ticket`; `TicketMessage.sender` -> `User`.

## Routes
| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/auth/register` | Public | Register user |
| POST | `/auth/login` | Public | Login |
| GET | `/auth/me` | Auth | Current user |
| GET/POST | `/projects` | Public / Admin, Editor | List / create projects |
| GET/PATCH/DELETE | `/projects/:id` | Public / Admin, Editor / Admin | Read / update / delete |
| GET/POST | `/projects/categories` | Public / Admin, Editor | Project categories |
| GET/POST | `/articles` | Public / Admin, Editor | List / create articles |
| GET/PATCH/DELETE | `/articles/:id` | Public / Admin, Editor / Admin | Read / update / delete |
| GET/POST | `/articles/categories` | Public / Admin, Editor | Article categories |
| POST | `/contacts` | Public | Submit contact form |
| GET/PATCH/DELETE | `/contacts/:id` | Admin, Support / Admin | Manage contact messages |
| GET/POST | `/tickets` | Auth | List own tickets / create ticket |
| GET | `/tickets/:id` | Owner or Support/Admin | Ticket with messages |
| POST | `/tickets/:id/replies` | Auth + ticket access | Reply with optional attachments |
| PATCH | `/tickets/:id` | Support/Admin | Update ticket status, priority, assignment |
| GET/POST | `/departments` | Public / Admin | List / create departments |

Protected routes require `Authorization: Bearer <token>`.

## Uploads
Send `multipart/form-data` to project/article create/update or ticket reply routes. File fields can use any name. Files are parsed with Formidable 2.1.1 and uploaded to Cloudinary folder `company-site`. Maximum file size is 10 MB per file and maximum 12 files per request.

For project galleries, uploaded files are stored in `gallery`. For article/project single-cover routes, the first uploaded file is used as `cover`. For ticket replies, uploaded files are attached to the message.

## Example requests

Register:
```bash
curl -X POST http://localhost:5000/api/auth/register \
 -H "Content-Type: application/json" \
 -d '{"name":"Admin","email":"admin@example.com","password":"ChangeMe123"}'
```

Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
 -H "Content-Type: application/json" \
 -d '{"email":"admin@example.com","password":"ChangeMe123"}'
```

Create a project (use an admin/editor token):
```bash
curl -X POST http://localhost:5000/api/projects \
 -H "Authorization: Bearer YOUR_TOKEN" \
 -F "title=Corporate Website" -F "description=Project details" \
 -F "isPublished=true" -F "files=@./cover.jpg"
```

Create a ticket:
```bash
curl -X POST http://localhost:5000/api/tickets \
 -H "Authorization: Bearer YOUR_TOKEN" -H "Content-Type: application/json" \
 -d '{"subject":"Need help","description":"Please contact me","priority":"normal"}'
```

## Important production notes
- Registration intentionally creates ordinary `user` accounts. Promote the first admin manually in MongoDB or create a secure one-time admin seed script before deployment.
- Public list endpoints currently return all records; add a publication filter/policy before exposing unpublished content in production.
- Configure Cloudinary allowed formats and file-size limits to match your requirements.
- Add email notifications, password reset, audit logs, and stricter schema validation before production use.
