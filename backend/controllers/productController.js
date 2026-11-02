import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsDataPath = path.join(__dirname, '../data/products.json');
const categoriesDataPath = path.join(__dirname, '../data/categories.json');

const readJson = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf-8'));

export const getProducts = (req, res) => {
  try {
    let products = readJson(productsDataPath);
    const { category, search, sort } = req.query;

    if (category && category !== 'all') {
      products = products.filter(p => p.category === category);
    }

    if (search) {
      const q = search.toLowerCase();
      products = products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q)
      );
    }

    if (sort === 'price-low') {
      products.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      products.sort((a, b) => b.price - a.price);
    }

    res.json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch products', error: error.message });
  }
};

export const getProductById = (req, res) => {
  try {
    const products = readJson(productsDataPath);
    const product = products.find(p => p.id === req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching product', error: error.message });
  }
};

export const getCategories = (req, res) => {
  try {
    const categories = readJson(categoriesDataPath);
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch categories', error: error.message });
  }
};

