/** @type {import('next').NextConfig} */
import withSass from '@zeit/next-sass';

export default {
  reactStrictMode: true,
  ...withSass(),
};
