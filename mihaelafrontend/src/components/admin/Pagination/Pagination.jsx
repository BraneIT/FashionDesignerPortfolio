export const Pagination = ({projectsPerPage, totalProjects}) =>{
    const pageNumbers = [];
    console.log("pagination",Math.ceil(totalProjects / projectsPerPage));
    console.log('total projects', totalProjects);
    console.log('Project per page', projectsPerPage);
    for (let i = 1; i <= Math.ceil(totalProjects / projectsPerPage); i++) {
        console.log("logging i", i);
      pageNumbers.push(i);
    }
    return (
      <nav>
         <ul className="pagination">
        <div>nsdfasdfasdfsadfasdf</div> 
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a  href="#!" className="page-link">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
      </nav>
    );
}