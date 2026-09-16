# ResolveHub

A simple issue tracking and support management system built with React, TypeScript and Supabase.

 **Live site:** https://roshitha05.github.io/resolvehub/

## About

ResolveHub is a support issue tracker where users can create an account, submit issues and keep track of their progress.

I built this project to work with React and TypeScript on the frontend while using Supabase for authentication and database management. I also wanted the project to cover more than just the application itself, so testing and deployment are handled with Vitest and GitHub Actions.

## Features

- User registration and login
- Email verification
- Protected routes and persistent sessions
- Create support issues
- Low, Medium and High priority levels
- Open, In Progress and Resolved statuses
- Search issues by title or description
- Filter by priority and status
- Individual issue details
- Update issue status
- Dashboard with issue statistics
- User-specific issue access

## Tech Stack

| Area | Technology |
| --- | --- |
| Frontend | React, TypeScript |
| Build | Vite |
| Routing | React Router |
| Backend | Supabase |
| Database | PostgreSQL |
| Authentication | Supabase Auth |
| Testing | Vitest, React Testing Library |
| CI/CD | GitHub Actions |
| Hosting | GitHub Pages |

## How it works

After signing in, users are taken to their dashboard where they can see a breakdown of their current issues and their three most recent requests.

New issues require a title, description and priority. Once created, they can be viewed from the Issues page, searched by title or description, and filtered by status or priority.

Opening an issue shows its full details and allows its status to be changed between Open, In Progress and Resolved.

## Authentication and RLS

Authentication is handled through Supabase Auth.

Each issue stores the ID of the user who created it. I use Supabase Row Level Security (RLS) to make sure users can only access their own issues rather than relying only on checks in the frontend.

For example:

```sql
create policy "Users can view own issues"
on public.issues
for select
to authenticated
using (
  auth.uid() = user_id
);
```

Similar policies are used when creating and updating issues.

The `user_id` foreign key also uses `ON DELETE CASCADE`, so issues belonging to a deleted account do not remain in the database.

## Testing

The project currently has three automated tests covering the Issues page:

- displaying issues returned from Supabase
- searching for an issue
- filtering issues by status

Run them with:

```bash
npm run test:run
```

You can also run:

```bash
npm run lint
npm run build
```

## CI/CD

Changes pushed to `main` run through a GitHub Actions workflow.

The workflow:

1. installs dependencies
2. runs the Vitest tests
3. runs ESLint
4. builds the application
5. deploys the build to GitHub Pages

The deployment uses Node.js 22.

## Project Structure

```text
src/
├── components/
│   ├── header.tsx
│   └── sidebar.tsx
├── pages/
│   ├── createissue.tsx
│   ├── dashboard.tsx
│   ├── issuedetails.tsx
│   ├── issues.tsx
│   ├── issues.test.tsx
│   ├── login.tsx
│   └── register.tsx
├── test/
│   └── setup.ts
├── App.tsx
├── index.css
├── main.tsx
└── supabase.ts
```

## Running Locally

Clone the repository:

```bash
git clone https://github.com/roshitha05/resolvehub.git
cd resolvehub
```

Install the dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_publishable_key
```

Then start the development server:

```bash
npm run dev
```

## Documentation

More detail on the database design, RLS policies, testing, implementation and deployment is available in the technical report:

[ResolveHub Technical Project Report](docs/ResolveHub-Technical-Report.pdf)

## Future Improvements

There are a few things I'd like to add later, including:

- support staff roles and issue assignment
- comments on issues
- attachments
- notifications
- issue history
- pagination
- more automated tests

## License

MIT