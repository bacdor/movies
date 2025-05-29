# Front-End Developer Assessment: Movie Search & Management App

## 🎯 Assessment Overview

**Time Limit:** 2 hours  
**Difficulty:** Junior to Mid-Level  
**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS

You will build a **Movie Search & Management App** that allows users to search for movies, view details, and manage a personal favorites list. This assessment evaluates your skills in React development, TypeScript usage, responsive design, and API integration.

## 📋 What You'll Build

A responsive web application with the following core features:
- Movie search functionality
- Movie grid display with responsive layout
- Movie detail view (modal or separate page)
- Favorites/watchlist management
- Basic filtering and sorting
- Mobile-responsive design

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Basic knowledge of React, TypeScript, and Tailwind CSS

### Setup Instructions

1. **Clone and Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. **Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

4. **Verify Setup**
   You should see the default Next.js page. You're ready to begin!

## 📁 Project Structure

Your project is already set up with the following structure:

```
├── README.md                           # Quick start guide
├── ASSESSMENT_INSTRUCTIONS.md          # Complete instructions
├── API_OVERVIEW.md                     # API & Database guide
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── movies/
│   │   │   │   ├── route.ts            # Main movies endpoint
│   │   │   │   ├── [id]/route.ts       # Individual movie endpoint
│   │   │   │   ├── search/route.ts     # Search endpoint
│   │   │   │   └── popular/route.ts    # Popular movies endpoint
│   │   │   └── genres/
│   │   │       └── route.ts            # Genres endpoint
│   ├── lib/
│   │   ├── database.ts                 # Database connection manager
│   │   ├── dal/
│   │   │   └── movieDAL.ts             # Data Access Layer
│   │   └── api.ts                      # Client-side API wrapper
│   └── types/
│       └── movie.ts                    # TypeScript interfaces
├── scripts/
│   ├── init-db.js                      # Database initialization
│   ├── seed-db.js                      # Data seeding
│   └── reset-db.js                     # Database reset
└── movies.db                           # SQLite database file
├── package.json                        # Dependencies
└── tsconfig.json                       # TypeScript config
```

## 🎬 Mock Data & API

All information regarding the mock data and API can be found in [API_OVERVIEW.md](./API_OVERVIEW.md).

## 🎯 Assessment Requirements

### Core Features (Must Have - 70% of score)

1. **Movie Search** (15 points)
   - Search input field
   - Search by movie title, director, or cast
   - Display search results in real-time or on submit
   - Handle empty states and no results

2. **Movie Display** (15 points)
   - Responsive grid layout for movie cards
   - Show movie poster, title, year, and rating
   - Clean, professional card design
   - Proper image handling (loading states, fallbacks)

3. **Movie Details** (15 points)
   - Click on movie card to view details
   - Show full movie information (description, cast, director, etc.)
   - Implement as modal OR separate page
   - Include close/back functionality

4. **Favorites Management** (15 points)
   - Add/remove movies from favorites
   - Visual indicator for favorited movies
   - Persist favorites in localStorage
   - View favorites list/filter

5. **Responsive Design** (10 points)
   - Mobile-first approach
   - Works well on desktop, tablet, and mobile
   - Proper breakpoints and layout adjustments
   - Touch-friendly interface elements

### Bonus Features (Nice to Have - 30% of score)

6. **Advanced Filtering** (8 points)
   - Filter by genre dropdown
   - Filter by year/decade
   - Multiple filter combinations

7. **Sorting Options** (7 points)
   - Sort by title, year, or rating
   - Ascending/descending options
   - Visual sort indicators

8. **Enhanced UX** (8 points)
   - Loading states during API calls
   - Error handling and user feedback
   - Smooth animations and transitions
   - Keyboard navigation support

9. **Performance & Accessibility** (7 points)
   - Proper semantic HTML
   - ARIA labels and roles
   - Keyboard accessibility
   - Image optimization

## 🛠 Technical Requirements

### Must Use:
- ✅ **TypeScript** - Proper typing for all components and functions
- ✅ **React Hooks** - useState, useEffect, custom hooks
- ✅ **Tailwind CSS** - For all styling (no external CSS libraries)
- ✅ **Next.js App Router** - Use the existing app directory structure

### Code Quality Standards:
- Clean, readable component structure
- Proper TypeScript interfaces and types
- Meaningful variable and function names
- Consistent code formatting
- Basic error handling

### Browser Support:
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive (iOS Safari, Chrome Mobile)

## 📱 Design Guidelines

### Layout Requirements:
- **Mobile**: Single column grid
- **Tablet**: 2-3 column grid
- **Desktop**: 3-4 column grid
- **Large Desktop**: 4-5 column grid

### Color Scheme:
Use the existing Tailwind color palette or create a cohesive theme:
- Primary: Blue tones for interactive elements
- Secondary: Gray tones for text and backgrounds
- Accent: Use for favorites/highlights
- Success/Error: Green/Red for feedback

### Typography:
- Use the existing Geist font family
- Clear hierarchy (headings, body text, captions)
- Readable font sizes (minimum 14px on mobile)

## 🚀 Getting Started Checklist

### Phase 1: Setup (15 minutes)
- [ ] Read through all requirements
- [ ] Set up the mock data files
- [ ] Create the API utility functions
- [ ] Plan your component structure

### Phase 2: Core Implementation (75 minutes)
- [ ] Create basic movie card component
- [ ] Implement movie grid layout
- [ ] Add search functionality
- [ ] Create movie detail view
- [ ] Implement favorites system
- [ ] Make responsive

### Phase 3: Polish & Bonus (30 minutes)
- [ ] Add filtering and sorting
- [ ] Implement loading states
- [ ] Add error handling
- [ ] Test on different screen sizes
- [ ] Add final touches and animations

## 📝 Submission Guidelines

### What to Submit:
1. **Complete codebase** with all your implementations
2. **Updated README.md** with:
   - Brief description of your implementation
   - Features you completed
   - Any trade-offs or decisions you made
   - Instructions to run your code
   - Time spent on the assessment

### Code Quality Checklist:
- [ ] All TypeScript errors resolved
- [ ] Code is properly formatted
- [ ] Components are well-organized
- [ ] No console errors in browser
- [ ] Responsive design works on mobile

### Submission Format:
- Zip the entire project folder (exclude node_modules)
- OR provide a GitHub repository link
- Include any additional notes or explanations

## 🎯 Evaluation Criteria

You will be evaluated on:

1. **Functionality** (40%) - Do the features work as expected?
2. **Code Quality** (30%) - Is the code clean, organized, and well-typed?
3. **Design & UX** (20%) - Is it visually appealing and user-friendly?
4. **Technical Implementation** (10%) - Proper use of React, TypeScript, and best practices

### Success Indicators:
- **Junior Level**: Core features working, basic responsive design
- **Mid Level**: All core features + some bonus features, good code organization
- **Senior Level**: Excellent implementation with advanced features and exceptional UX

## 🆘 Need Help?

### Common Issues:
- **TypeScript errors**: Make sure all interfaces are properly imported
- **Styling issues**: Check Tailwind class names and responsive breakpoints
- **State management**: Use React hooks appropriately for local state

### Resources:
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

## 🎬 Ready to Begin?

1. **Read through all requirements carefully**
2. **Set up the mock data and API files**
3. **Start with the basic movie display**
4. **Build incrementally and test frequently**
5. **Focus on core features first, then add bonuses**

**Good luck! Show us what you can build in 2 hours! 🚀** 