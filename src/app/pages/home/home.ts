import { Component, computed, signal } from '@angular/core';
import { productsData } from '../../data';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent {
  // State Signals
  activeCategory = signal('all');
  keyword = signal('');
  sortMode = signal('default');

  // Computed Signal for filtered and sorted products
  filteredProducts = computed(() => {
    const category = this.activeCategory();
    const search = this.keyword().trim().toLowerCase();
    const sort = this.sortMode();

    let products = productsData.filter(p => {
      const matchCategory = category === 'all' || p.category === category;
      const matchKeyword = !search || p.title.toLowerCase().includes(search);
      return matchCategory && matchKeyword;
    });

    if (sort === 'asc') {
      products = products.sort((a, b) => a.price - b.price);
    } else if (sort === 'desc') {
      products = products.sort((a, b) => b.price - a.price);
    }

    return products;
  });

  // Methods to update state
  setCategory(category: string) {
    this.activeCategory.set(category);
  }

  // Helper methods for template
  labelCategory(cat: string): string {
    switch (cat) {
      case "gaming": return "Gaming";
      case "van-phong": return "Văn Phòng";
      case "design": return "Design";
      default: return cat;
    }
  }

  formatPrice(price: number): string {
    return price.toLocaleString("vi-VN") + "₫";
  }
}
