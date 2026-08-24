import RegisterForm from "../_components/RegisterForm";
import Container from "@/components/common/Container";
import { Card } from "@/components/ui/card";

export default function RegisterPage() {
  return (
    <Container>
      <div className="flex min-h-screen items-center justify-center py-10">
        <Card className="w-full max-w-md shadow-lg">
          <RegisterForm />
        </Card>
      </div>
    </Container>
  );
}
