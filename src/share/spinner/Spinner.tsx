import classes from './Spinner.module.css';

const Spinner: React.FC = () => {
  return (
      <>
        <img className={classes.spinner} src="assets/Spinner.svg" alt="loading..." />
      </>
  )
}

export default Spinner
