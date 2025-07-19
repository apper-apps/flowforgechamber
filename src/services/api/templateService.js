import templatesData from "@/services/mockData/templates.json";

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class TemplateService {
  constructor() {
    this.templates = [...templatesData];
    this.nextId = Math.max(...this.templates.map(t => t.Id)) + 1;
  }

  async getAll() {
    await delay(300);
    return [...this.templates];
  }

  async getById(id) {
    await delay(200);
    const template = this.templates.find(t => t.Id === parseInt(id));
    if (!template) {
      throw new Error("Template not found");
    }
    return { ...template };
  }

  async getByCategory(category) {
    await delay(250);
    return this.templates
      .filter(t => t.category === category)
      .map(t => ({ ...t }));
  }

  async search(query) {
    await delay(300);
    const searchTerm = query.toLowerCase();
    return this.templates
      .filter(t => 
        t.name.toLowerCase().includes(searchTerm) ||
        t.description.toLowerCase().includes(searchTerm) ||
        t.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      )
      .map(t => ({ ...t }));
  }

  async getCategories() {
    await delay(150);
    const categories = [...new Set(this.templates.map(t => t.category))];
    return categories.sort();
  }

  async purchaseTemplate(templateId, userInfo) {
    await delay(400);
    const template = this.templates.find(t => t.Id === parseInt(templateId));
    if (!template) {
      throw new Error("Template not found");
    }

    // Simulate payment processing
    const order = {
      Id: Date.now(),
      templateId: template.Id,
      templateName: template.name,
      price: template.price,
      userInfo,
      purchaseDate: new Date().toISOString(),
      status: "completed",
      downloadUrl: `https://api.example.com/downloads/${template.Id}`
    };

    // Increment downloads count
    template.downloads += 1;

    return { ...order };
  }

  async create(templateData) {
    await delay(400);
    const newTemplate = {
      ...templateData,
      Id: this.nextId++,
      downloads: 0,
      rating: 0
    };
    this.templates.push(newTemplate);
    return { ...newTemplate };
  }

  async update(id, templateData) {
    await delay(350);
    const index = this.templates.findIndex(t => t.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Template not found");
    }
    
    this.templates[index] = { ...this.templates[index], ...templateData, Id: parseInt(id) };
    return { ...this.templates[index] };
  }

  async delete(id) {
    await delay(250);
    const index = this.templates.findIndex(t => t.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Template not found");
    }
    
    const deletedTemplate = { ...this.templates[index] };
    this.templates.splice(index, 1);
    return deletedTemplate;
  }
}

export const templateService = new TemplateService();