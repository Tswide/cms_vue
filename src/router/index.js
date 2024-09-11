import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import DHeader from '../views/Dashboard/DHeader.vue'
import DCategory from '../views/Dashboard/DCategory.vue'
import DArticle from '../views/Dashboard/DArticle.vue'
import NotFound from '../views/NotFound.vue'
import Categories from '../views/Categories.vue'
import AllArticles from '../views/AllArticles.vue'
import ArticleFilter from '../views/ArticleFilter.vue'
import Product from '../views/Product.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/categorie',
      name: 'categorie',
      component: Categories,
    },
    {
      path: '/articles',
      name: 'articles',
      component: AllArticles,
    },
    {
      path: '/categorie/:categoryName',
      name: 'category-page',
      component: ArticleFilter,
      meta: { breadcrumb: (route) => route.params.categoryName },
    },
    {
      path: '/articles/:articleName',
      name: 'article-page',
      component: Product,
      meta: { breadcrumb: (route) => route.params.articleName }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      children: [
        { path: '/dashboard-header', name: 'dashboard-header', component: DHeader, meta: { breadcrumb: 'Header' } },
        { path: '/dashboard-category', name: 'dashboard-category', component: DCategory, meta: { breadcrumb: 'Category' } },
        { path: '/dashboard-article', name: 'dashboard-article', component: DArticle, meta: { breadcrumb: 'Article' } },
      ],
    },
    { path: '/:pathMatch(.*)*', component: NotFound },
  ]
})

export default router
