import SearchDataGrid from '@/components/search-data-grid/search-data-grid';
import TotalsDataGrid from '@/components/totals-data-grid/totals-data-grid';

export default function Home() {
  return (
    <>
      <TotalsDataGrid />
      <SearchDataGrid />
    </>
  );
}
