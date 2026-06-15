# Supabase Setup Instructions for O Último Brasileiro Messaging System

## 1. Create a Supabase Account

1. Go to https://supabase.com/
2. Sign up for a free account
3. Create a new project
4. Note down your Project URL and Anonymous Key (found in Project Settings > API)

## 2. Update Environment Variables

Open the `.env.local` file in your project and replace the placeholder values:

```
# Supabase
SUPABASE_URL=your-supabase-project-url
SUPABASE_ANON_KEY=your-supabase-anon-key
```

## 3. Create the Messages Table

In your Supabase dashboard, go to the Table Editor and create a new table with the following schema:

### Table Name: `messages`

| Column Name | Type | Properties |
|-------------|------|------------|
| id | uuid | Primary Key, Default: gen_random_uuid() |
| sent_by | text | Not Null |
| received_by | text | Not Null, Default: 'all' |
| text | text | Not Null |
| created_at | timestamp with time zone | Not Null, Default: now() |

## 4. Enable Realtime

1. Go to the Table Editor and select the `messages` table
2. Click on the "Realtime" tab
3. Enable Realtime for the table
4. Select "All publications" for the publication

## 5. Set Row Level Security (RLS)

To ensure data security, enable Row Level Security on the messages table and create the following policies:

### Policy: "Users can insert their own messages"
- ON: messages
- TO: authenticated
- WITH CHECK: `auth.role() = 'authenticated'`
- USING: `auth.role() = 'authenticated'`

### Policy: "Users can read all messages"
- ON: messages
- TO: authenticated
- USING: `true`

## 6. Test the Implementation

1. Run `npm run dev` to start your development server
2. Navigate to your site
3. Click "Login" to create an account or sign in
4. Click "Mensagens" to access the messaging interface
5. Send a message and verify it appears in real-time for other users

## 7. Additional Notes

- The messaging system currently sends messages to all users (received_by: 'all')
- For private messaging between users, you would need to modify the `received_by` field to store specific user emails
- The Supabase free tier is sufficient for development and initial users
- All authentication and data storage is handled by Supabase
- The messaging system uses Supabase Realtime for instant updates without page refreshes

## Troubleshooting

If you encounter issues:
- Verify your Supabase URL and key in `.env.local`
- Ensure Realtime is enabled for the messages table
- Check the browser console for any Supabase errors
- Make sure Row Level Security policies are correctly configured

For more information, visit the Supabase documentation: https://supabase.com/docs