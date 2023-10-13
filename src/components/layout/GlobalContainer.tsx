/**************************************************************



***************************************************************/
import "./GlobalContainer.scss";

type GlobalContainerProps = {
  children: React.ReactNode,

}

const GlobalContainer = ({ children }: GlobalContainerProps) => {

  return(
    <div className="globalContainer">
      { children }
    </div>
  )
}

export default GlobalContainer;