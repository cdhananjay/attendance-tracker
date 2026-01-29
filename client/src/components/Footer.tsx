import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="w-full bg-card mt-4">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center text-muted-foreground">
                <Link target={'_blank'} to={'https://dhananjayc.vercel.app/'}>
                    me
                </Link>
                <Link
                    target={'_blank'}
                    to={'https://github.com/cdhananjay/attendance-tracker'}
                    className={'underline hover:no-underline'}
                >
                    github repo
                </Link>
            </div>
        </footer>
    );
};

export default Footer;
