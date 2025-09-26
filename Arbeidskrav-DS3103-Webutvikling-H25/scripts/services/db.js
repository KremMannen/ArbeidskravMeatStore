import mysql from "mysql2/promise";

const productService = (() => {
  const getConnection = async () => {
    return mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "yourpassword",
      database: "mydb",
    });
  };

  const getAllProducts = async () => {
    const connection = await getConnection();
    const [rows] = await connection.execute("SELECT * FROM products");
    await connection.end();
    return rows;
  };

  const getProductById = async (id) => {
    const connection = await getConnection();
    const [rows] = await connection.execute(
      "SELECT * FROM products WHERE id = ?",
      [id]
    );
    await connection.end();
    return rows[0];
  };

  // Testing if database works
  async function logAllProducts() {
    try {
      const products = await productService.getAllProducts();
      console.log("All products:", products);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  }

  logAllProducts();

  return {
    getAllProducts,
    getProductById,
  };
})();

export default productService;
