# shifts_nestjs

## What is it?
A shift management system for soldiers and commanders. Allows creating, updating and deleting shifts and assignments.

## API Endpoints

### Shifts
- `POST /shifts` - Create new shift (commanders only)
- `PUT /shifts/:id` - Update shift (commanders only)
- `DELETE /shifts/:id` - Delete shift (commanders only)

### Assignments
- `GET /assignments/my` - Get my assignments (soldiers)
- `GET /assignments` - Get all assignments (commanders)
- `POST /assignments` - Create new assignment (commanders only)

### Users
- `POST /auth/login` - Login
- `POST /auth/register` - Register

## Roles
- **SOLDIER**: Can only see their own assignments
- **COMMANDER**: Can view and manage all shifts and assignments
