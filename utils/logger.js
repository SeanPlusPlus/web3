const { NODE_ENV } = process.env;

// const isDev = NODE_ENV === 'development';
const isDev = true

export const log = (status, color, data) => {
  if (isDev) {
    console.log(`%c ${status}`, `color: ${color}; font-weight:bold;`, data);
  }
}