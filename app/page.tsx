import { CalculatorForm } from '@/organisms';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function Home() {
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Retail Calculator
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
          Calculate order totals with volume discounts and regional tax rates
        </Typography>

        <CalculatorForm />
      </Box>
    </Container>
  );
}
