import HealthlyLogoMain from "/healthly_main_logo.png"
import HealthlyLogoIcon from "/healthly_rmbg_min_logo.png"


const Logo = () => {
  return (
    <a href="/" className="block">
      <picture>
        <source 
          media="(min-width: 768px)" 
          srcSet={HealthlyLogoMain} 
        />
        
        {/* Mobile */}
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