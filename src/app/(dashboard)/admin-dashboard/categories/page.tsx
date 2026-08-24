import { getAllCategoriesForAdmin } from "../../_actions/categoryAdminActions";
import CategoryAdminManager from "../../_components/CategoryAdminManager";

export default async function AdminCategoriesPage() {
  const result = await getAllCategoriesForAdmin();
  const categories = result.data ?? [];

  return <CategoryAdminManager categories={categories} />;
}
