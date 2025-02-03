import "../index.css";
import { usePagnitaionRequest } from "../hooks/usePaginationRequest";
import { MainDataGrid } from "./MainDataGrid";
import { Header } from "./Header";
import { Button } from "./shared/Button";

export const Main = () => {
  const {
    adjustedAmountOfItemsOnPage,
    changePage,
    setOrderDirection,
    setFilterOption,
    paginationData,
    asc,
  } = usePagnitaionRequest();

  console.log(paginationData);
  return (
    <div>
      <Header title="Electricity data" />
      {paginationData?.data && (
        <div>
          <MainDataGrid
            data={paginationData.data}
            setOrderDirection={setOrderDirection}
            setFilterOptions={setFilterOption}
            setAmountOfItemsOnPage={adjustedAmountOfItemsOnPage}
            asc={asc}
          />
          <div className="page-change">
            <Button
              text={"<"}
              disabled={!paginationData.data.hasPreviousPage}
              changePage={changePage}
              pageNumber={paginationData.data.pageIndex - 1}
            />
            {paginationData.data.pageIndex - 1 > 1 && (
              <Button
                text={(paginationData.data.pageIndex - 1).toString()}
                changePage={changePage}
                pageNumber={paginationData.data.pageIndex - 1}
              />
            )}
            <Button
              text={paginationData.data.pageIndex.toString()}
              changePage={changePage}
              pageNumber={paginationData.data.pageIndex}
              color="#32363f"
            />
            {paginationData.data.pageIndex + 1 <=
              paginationData.data.totalPages && (
              <Button
                text={(paginationData.data.pageIndex + 1).toString()}
                changePage={changePage}
                pageNumber={paginationData.data.pageIndex + 1}
              />
            )}
            {paginationData.data.pageIndex + 2 <=
              paginationData.data.totalPages && (
              <Button
                text={(paginationData.data.pageIndex + 2).toString()}
                changePage={changePage}
                pageNumber={paginationData.data.pageIndex + 2}
              />
            )}
            {paginationData.data.pageIndex + 3 <=
              paginationData.data.totalPages && (
              <Button
                text={(paginationData.data.pageIndex + 3).toString()}
                changePage={changePage}
                pageNumber={paginationData.data.pageIndex + 3}
              />
            )}
            <Button
              disabled={!paginationData.data.hasNextPage}
              text={">"}
              changePage={changePage}
              pageNumber={paginationData.data.pageIndex + 1}
            />
          </div>
        </div>
      )}
    </div>
  );
};
