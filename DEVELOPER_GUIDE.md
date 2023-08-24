# Developer Guide

## Technology stack

- Nodejs 16.x
- Next.js 12

## Set up the configuration

Under development, we could actually use both staging and production configurations (by copying all files,  under `conf/staging/fe/*` and `conf/prod/fe/*`, respectively, to the root folder). However, it's recommended to use staging for local development.

## Folder structure

This repo follows the structure of [Pages Router](https://nextjs.org/docs/getting-started/project-structure) under Next.js (currently v12).

## Authentication

Under `data/services/AuthService.tsx`

## Firebase

Both Production and Staging environments share the same Firebase storage.

## Styling

- [TailwindCSS](https://tailwindcss.com/)
- [TailwindUI](https://tailwindui.com/)
- (Legacy) [Bootstrap 5](https://getbootstrap.com/docs/5.0/getting-started/introduction)

## Data fetching

Implemented under `data/services/*.tsx`

### Worlds

- Get root worlds: `GET /subworld/root_template`
- Get sub-worlds: `GET /subworld/root_template/{rootId}/deriv`

Fetch worlds via REST over HTTP from the back-end server, under `data/services/SubWorldTemplateService.tsx`.

### Blogs

Fetch blogs from Firebase (in collection `blog_post`), under `data/services/FirebaseService.tsx`.
Staging and Production share the same set of blogs.

### Events

Back-end API: `GET /event`

The basic information of events are fetched via REST over HTTP from the back-end server. After which, for each event, we fetch its thumbnail image from another endpoint from the same back-end server.
The implementation is under `data/services/EventsService.tsx`.

### Pagination

As of now (20/08/2023), back-end server doesn't support any types of pagination, and this front-end repo simulates pagination via infinite scrolling with a small timeout between pages.
The implementation is at `components/marketplace/InfiniteList.tsx`. The timeout simulations are under `components/asset/DerivWorldList.tsx` (for worlds) and `components/marketplace/InfiniteList.tsx` (for general-purpose).