import MDEditor from '@uiw/react-md-editor';

export default ({ teachers }) => {
    const social = [
		{
			displayName: "Exper",
			photoURL: "https://lh3.googleusercontent.com/a-/AOh14Ggt3By84iVIEojD5xYhfTUh4najH7SNGAM5iOd-=s96-c",
			uid: "0c0L5gLvplOgFpcQK2dGsWB0ltg2",
			comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		}
	]

    return (
        <div className="container container__background padding">
            <div className="row">
                <p>Social Activity</p>
                <div className="line"></div>
            </div>

            <div className="classroom-activity">

                { social.map(({ uid, displayName, photoURL, comment }) => {
                    return (
                        <div className="classroom-activity__item">
                            <img src={photoURL} />
                            <div className="classroom-activity__content">
                                <div className="classroom-activity__content-text">
                                    <b className={teachers.find(u => u.uid == uid) ? "classroom-activity__content-text--teacher" : ""}>{ displayName }</b>
                                    <p>@{ uid }</p>
                                </div>
                                <div className="classroom-activity__content-inner">
                                    <MDEditor.Markdown source={comment} />
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}