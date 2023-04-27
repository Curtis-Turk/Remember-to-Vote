import { defineConfig } from 'cypress';

export default defineConfig({
  env: {
    supabaseURL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

// import { defineConfig } from 'cypress'

// export default defineConfig({
//   env: {
//     foo: 'bar',
//     baz: 'quux',
//   },
// })
