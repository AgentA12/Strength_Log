export default function Pagination({
  templatesPerPage,
  totalTemplates,
  paginate,
  currentPage,
}) {
  const pageNumbers = [];

 

  for (let i = 1; i <= Math.ceil(totalTemplates / templatesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label="Page navigation" className="mt-7 ">
      <ul className="flex justify-center items-center -space-x-px">
        {pageNumbers.length <= 1
          ? null
          : pageNumbers.map((number) => (
              <li key={number}>
                <a
                  onClick={() => {
                    paginate(number);
                  }}
                  href="#"
                  className={`${
                    number === currentPage
                      ? "bg-primary text-background border-background"
                      : null
                  } rounded py-2 px-3 ml-0 leading-tight text-gray-500 bg-background border border-gray-600 hover:border-background hover:bg-primary hover:text-background ease-in-out`}
                >
                  {number}
                </a>
              </li>
            ))}
      </ul>
    </nav>
  );
}
