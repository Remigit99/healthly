import HealthlyLogoMain from "/healthly_main_logo.png"
import HealthlyLogoIcon from "/healthly_rmbg_min_logo.png"


const Logo = () => {
  return (
    <a href="/" className="block">
      <picture>
        {/* Desktop: Show logo + text if screen is 768px or wider */}
        <source 
          media="(min-width: 768px)" 
          srcSet={HealthlyLogoMain} 
        />
        
        {/* Mobile: Default to the ordinary logo icon */}
        <img 
          src={HealthlyLogoIcon} 
          alt="Healthly Logo" 
          className="h-8 w-auto md:h-10 transition-all" 
        />
      </picture>
    </a>
  );
};

export default Logo;