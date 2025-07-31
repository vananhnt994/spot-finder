import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.e607d3bdfe0041f2a30b048989566b04',
  appName: 'Office Booking System',
  webDir: 'dist',
  server: {
    url: 'https://e607d3bd-fe00-41f2-a30b-048989566b04.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#6366f1',
      showSpinner: false
    }
  }
};

export default config;