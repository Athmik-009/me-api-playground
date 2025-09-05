# Me-API Playground

## Architecture

- **Node.js** with **Express.js** for REST API
- **MongoDB** for data storage (via Mongoose)
- **EJS** for UI rendering
- **Profile** schema supports: personal info, education, skills, projects, work, links, achievements

## Setup

### Local Development

1. Clone the repo:
   ```
   git clone <your-repo-url>
   cd me-api-playground
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Set up `.env`:
   ```
   MONGO_URI=mongodb://localhost:27017/me-api-playground
   ```
4. Start server:
   ```
   npm start
   ```
5. Visit [http://localhost:3000](http://localhost:3000)

### Production

- Set `MONGO_URI` to your production MongoDB URI.
- Use a process manager (e.g., PM2) for deployment.

## Schema

See [`Profile.js`](./Profile.js):

```javascript
{
  name: String,
  email: String,
  enrollmentNo: String,
  dob: String,
  mobileNo: String,
  education: [{ degree, institute, cgpa, year }],
  skills: [String],
  projects: [{ title, description, links: [String], skills: [String] }],
  work: [{ title, description, links: [String] }],
  links: { github, linkedin },
  achievements: [String]
}
```

## Sample Requests

### Health Check

```bash
curl http://localhost:3000/health
```

## Known Limitations

- No authentication or authorization.
- Only one profile supported (single-user).
- No pagination for lists.
- Minimal validation on input data.
- No file uploads or image support.

---

**For more details, see the code and endpoints in `routes.js`.**
