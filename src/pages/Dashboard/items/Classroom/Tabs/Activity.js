import MDEditor from '@uiw/react-md-editor';

import "./Activity.style.scss";

export default ({ teachers }) => {
    const dateFormat = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'full'
	});

    const social = [
		{
			displayName: "Exper",
			photoURL: "https://lh3.googleusercontent.com/a-/AOh14Ggt3By84iVIEojD5xYhfTUh4najH7SNGAM5iOd-=s96-c",
			uid: "0c0L5gLvplOgFpcQK2dGsWB0ltg2",
			comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
            date: Date.now()
		},
        {
			displayName: "Admin",
			photoURL: "https://cdn.dribbble.com/users/3028563/screenshots/16853329/media/c523f391d5a8add38368ba0bb91f8cd0.jpg?compress=1&resize=1200x900",
			uid: "0c0L5gLvplOgFpcQK2dGsWB0ltg2",
			comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed d",
            date: Date.now()
		},
	]

    const dateToString = (date) => {
		const dateObj = new Date(date);
  		return dateFormat.format(dateObj);
	}

    return (
        <div className="container">
            <div className="row">
                <p>Social Activity</p>
                <div className="line"></div>
            </div>

            <div className="classroom-activity">

                { social.map(({ uid, displayName, photoURL, comment, date }) => {

                    return (
                        <div className="classroom-activity__item">
                            <img src={photoURL} />
                            <div className="classroom-activity__content">
                                <div className="classroom-activity__content-text">
                                    <b className="classroom-activity__content-text--teacher">{ displayName }</b>
                                    <p>created an announcement</p>
                                </div>
                                
                                <div className="classroom-activity__content-inner">
                                    <MDEditor.Markdown source={comment} />
                                </div>

                                <div className="classroom-activity__bottom">
                                    <p className="classroom-activity__date">{ dateToString(date) }</p>
                                    <div className="classroom-activity__tags">
                                        <span className="classroom-activity__tags__tag">New</span>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}