import { useHistory } from "react-router-dom";

const technologiesList = {
    "nodejs": "https://cdn.iconscout.com/icon/free/png-512/node-js-1174925.png",
    "sass": "https://www.keepapi.ovh/wp-content/uploads/2018/10/sass.png",
    "react": "https://i0.wp.com/www.primefaces.org/wp-content/uploads/2017/09/feature-react.png?fit=260%2C260&ssl=1",
    "nextjs": "https://icons-for-free.com/iconfiles/png/512/NextJS-1324888744726908747.png",
    "angular": "https://sdtimes.com/wp-content/uploads/2018/04/angular.png",
    "vue": "https://avatars.githubusercontent.com/u/6128107?s=200&v=4",
}

export default (props) => {
    const { title, description, date, technologies } = props.data;
    const link = title.toLowerCase().split(" ").join("-");
    const history = useHistory();

    return (
        <div className="project" onClick={() => history.push("/dashboard/project/" + link)}>
            <div className="head">
                <div>
                    <b>{ title }</b>
                    <p>{ description }</p>
                </div>
            </div>
            <div className="bottom">
                <div className="technologies-outer">
                    <p>Technologies Used</p>
                    <div className="technologies-inner">
                        {  technologies.length > 0 && technologies != undefined ? technologies.map(img => {
                                return <img src={technologiesList[img]}/>
                            }) : <b>None Stated</b>
                        }
                    </div>
                </div>
                <div className="date">
                    <p>Date Created</p>
                    <b>{ date }</b>
                </div>
            </div>
        </div>
    )
}