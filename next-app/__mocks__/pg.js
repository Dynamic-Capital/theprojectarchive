export class Pool {
  query() {
    return Promise.resolve({ rows: [] });
  }
  end() {
    return Promise.resolve();
  }
}

export default { Pool };
