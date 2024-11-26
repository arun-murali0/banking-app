const HeaderBox = ({ title, type, subtext, user }: HeaderBoxProps) => {
	return (
		<section className="header-box">
			<h1 className="header-box-title">
				{title}
				{type === 'greeting' && <span className="text-bankGradient"> &nbsp;{user}</span>}
			</h1>
			<div className="header-box-subtext">{subtext}</div>
		</section>
	);
};

export default HeaderBox;
