const technologiesList = {
    "nodejs": "https://cdn.iconscout.com/icon/free/png-512/node-js-1174925.png",
    "sass": "https://www.keepapi.ovh/wp-content/uploads/2018/10/sass.png",
    "react": "https://i0.wp.com/www.primefaces.org/wp-content/uploads/2017/09/feature-react.png?fit=260%2C260&ssl=1",
}

export default (props) => {
    const { title, description, date, technologies } = props.data;

    return (
        <div className="project">
            <div className="head">
                <b>{ title }</b>
                <p>{ description }</p>
            </div>
            <div className="bottom">
                <div className="technologies-outer">
                    <p>Technologies Used</p>
                    <div className="technologies-inner">
                        { technologies.map(img => {
                            return <img src={technologiesList[img]}/>
                        })}
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