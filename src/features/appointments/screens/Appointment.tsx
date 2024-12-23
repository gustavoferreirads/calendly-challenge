import Container from "@/components/Container";
import Content from "@/features/appointments/components/Content";
import Sidebar from "@/features/appointments/components/Sidebar";

const Appointments = () => {
  return (
    <Container className="px-4">
      <div className="flex flex-col sm:flex-col lg:flex-row overflow-hidden w-full mx-0">
        <Sidebar />
        <Content />
      </div>
    </Container>
  );
};

export default Appointments;
