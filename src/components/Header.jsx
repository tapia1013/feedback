import PropTypes from 'prop-types';

const Header = ({ text }) => {
  return (
    <header>
      <div className="container">
        <h2>{text}</h2>
      </div>
    </header>
  );
};

// default prop values
Header.defaultProps = {
  text: 'Feedback UI'
}

// type check sort of like TypeScript
Header.propTypes = {
  text: PropTypes.string
}

export default Header;
