/// <reference types="node" />

export default {
  datasource: {
    db: {
      url: process.env.DATABASE_URL || 'file:./dev.db',
    },
  },
};