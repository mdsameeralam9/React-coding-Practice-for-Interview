import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FormLayout from './FormLayout';

const Form = () => {
  const initialConfig = new QueryClient()
  return (
    <QueryClientProvider client={initialConfig}>
        <FormLayout />
    </QueryClientProvider>
  )
}

export default Form