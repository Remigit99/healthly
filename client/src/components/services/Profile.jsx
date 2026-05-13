import {
  Phone,
  Mail,
  MapPin,
  Calendar,
  Activity,
  CreditCard,
  FlaskConical,
  ShieldPlus,
  Stethoscope,
  ChevronRightIcon
} from "lucide-react"

import { useGetParentDashboardQuery } from "../../store/features/services/servicesApiSlice";

import { FaWpforms, FaUserDoctor } from "react-icons/fa6";

const profileLinks = [
  {
    name: "Appointments",
    path: "/app/parent/appointments",
    icon: <Calendar />
  },
  {
    name: "Vital Signs",
    path: "/app/parent/medical-records",
    icon: <Activity />
  },
  // {
  //   name: "Prescriptions",
  //   path: "/app/parent/prescriptions",
  //   icon: <FlaskConical />
  // }
  {
    name: "Pediatrician",
    path: "/app/parent/pediatrician",
    icon: <FaUserDoctor />
  },
  {
    name: "Tests/Results",
    path: "/app/parent/medical-records",
    icon: <FlaskConical />
  },
  {
    name: "Consent Forms",
    path: "/app/parent",
    icon: <FaWpforms />
  },
  {
    name: "Treatments",
    path: "/app/parent/medical-records",
    icon: <ShieldPlus />
  },
  {
    name: "Payments",
    path: "/app/parent/payments",
    icon: <CreditCard />
  }

]



const Profile = () => {
  const {isLoading, data: parentDashboardData } = useGetParentDashboardQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log("Parent Dashboard Data:", parentDashboardData);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-24">Profile</h1>

      <main className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-16">

        {/* Personal Information */}
        <div className="p-4 shadow-[0_0_20px_5px_rgba(0,0,0,0.1)] rounded-lg mb-4">
          <div className="flex flex-col items-center gap-1">
            <img
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAMAAzAMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAwQFAQIH/8QAKxABAAIBAwIEBQUBAAAAAAAAAAECAwQRMSFBElFhcQUiMoGhEzM0QpEj/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAWEQEBAQAAAAAAAAAAAAAAAAAAEQH/2gAMAwEAAhEDEQA/APqgCoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABv122Q5dTjx9Jne3lAJhSnXx2xzPvL1XXU/tW0fkFsQ11WG3Txbe6aJiY3jaY9JAAAAAAAAAAAAAAAAAAAR5s1cNd7czxHm7myRixzee3DKyZLZLTa07yCTLqsuSNonw18oQguAABzzEPeLLfDO9J6d4eAGtgzVzV3rzHMJGRhyziyRbt3hrb+XCDoAAAAAAAAAAAAAAEgo/Eb73rTfiN5U0mpt4s959eiMwAFAAAABpaK3jwR5xOzNX/h37VvdBccAAAAAAAAAAAAAACQY1vqn3cdt9U+7i4AAAAAAC98Nn5bx6qK98O4t7wguRwEcAAAAAAAAAAAAACvrb2x4t68zMdVhX10b6efSdwZs89QFwAAAAAAE2kvamasRPSZ6oUuljfPSPVBqgAAAAAAAAAAAAAPOWsXpas94ejvuDFmNpmJ5gX9fiicXjisRaJ6zCguAAAAAAAt/Dq/9JvMdIjaFfBT9TNWu/Tfq1qxEV2rEQg6AAAAAAAAAAAAAAADlqxas1niY2ZOXHOO81t2a6rr6RbF4+9QZ4CgAAD3gpGTLWs77TKC3oMW1ZvPNuPRcIiIjaOPIAAAAAAAAAAAAAAAAAQa2YjTW+2zuoz/AKMR3meIZ+XUZMs73np5QCMBQAAT6L+TTrsgImazExPWAbQoYtbaOl43jtML6AAAAAAAAAAADlrRWN5mI+4Oirk1mOvSN7T+Fe+syW6R8senING961je9vDCtl1tI6UibT/kKE2m31TM+8uAkzZr55+eY2jisIwUAAAAAAPbmFrDrb12i+1o8+6qEGrj1OLJxbafKUjGSUzZMc/JaY90GsKOPXTH7lPvCziz4sn0W6+vQEoAAAAG8Ag1OeMUdNpvP4Z172vMza271qMk5M1reu0IwAFgAAAAAAAAAAAAAEAAgsafVWxzEXtNqfmGlExMRMd2K0NBfxYfDz4SC0ECD//Z"
              alt="Profile"
              className="rounded-full border-2 border-gray-300 "
            />

            <h2 className="text-xl font-semibold mt-4">{parentDashboardData?.children[0].firstName || 'John Doe'}</h2>

          </div>

          <div className="flex flex-col items-center mt-4">
            <h5 className="font-semibold text-gray-500 mb-3">Personal Information:</h5>
            <div className="flex flex-col gap-2">
              <span className="flex items-center gap-2">
                <span><Phone /></span>
                <span className="text-gray-400">123-456-7890</span>
              </span>
              <span className="flex items-center gap-2">
                <span><Mail /></span>
                <span className="text-gray-400">john.doe@example.com</span>
              </span>
              <span className="flex items-center gap-2">
                <span><MapPin /></span>
                <span className="text-gray-400">123 Main St, Anytown, USA</span>
              </span>
            </div>


          </div>

        </div>

        {/* Overview */}
        <div className="p-4 shadow-lg rounded-lg mb-4">
          <h5 className="font-semibold mb-8 text-2xl">Overview:</h5>
          <div className="grid grid-cols-1 md:grid-cols-2  gap-6 md:gap-4">
            <span className="flex flex-col items-start gap-1">
              <p>Date of Birth:</p>
              <h6 className="text-gray-500">June 17, 2023</h6>
            </span>

            <span className="flex flex-col items-start gap-1">
              <p>Gender:</p>
              <h6 className="text-gray-500">Male</h6>
            </span>

            <span className="flex flex-col items-start gap-1">
              <p>Blood Type:</p>
              <h6 className="text-gray-500">O+</h6>
            </span>

            <span className="flex flex-col items-start gap-1">
              <p>Genotype:</p>
              <h6 className="text-gray-500">AA</h6>
            </span>

            <span className="flex flex-col items-start gap-1">
              <p>Allergies:</p>
              <h6 className="text-gray-500">Peanut, Dust</h6>
            </span>

            <span className="flex flex-col items-start gap-1">
              <p>Next of Kin:</p>
              <h6 className="text-gray-500">Jane Doe</h6>
            </span>

            <span className="flex flex-col items-start gap-1">
              <p>Next Appointment:</p>
              <h6 className="text-gray-500">June 20, 2023</h6>
            </span>

            <span className="flex flex-col items-start gap-1">
              <p>Prior Appointment:</p>
              <h6 className="text-gray-500">June 15, 2023</h6>
            </span>
          </div>
        </div>

        {/* Links */}

        <div className="mt-8">

          <h5 className="font-semibold mb-8 text-2xl">Quick Links:</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profileLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="flex items-center justify-between gap-2 p-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>{link.icon}</span>
                  <span>{link.name}</span>
                </div>

                <span>
                  <ChevronRightIcon />
                </span>
              </a>
            ))}
          </div>

        </div>

      </main>

    </div>
  );
}

export default Profile;