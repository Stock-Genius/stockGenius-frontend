import { TextField, styled } from "@mui/material";

const CustomTextField = styled(TextField)(({ theme }) => ({
    marginTop: '5px',
    width: '100%',
    '& .MuiInputBase-root': {
      padding: '0.25rem 1rem', // Adjust padding to match Tailwind input field
      backgroundColor: theme.palette.mode === 'dark' ? theme.palette.third : '#E5E7EB', // Match background colors
      borderRadius: '0.375rem',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.grey[300],
        borderRadius: '0.375rem',
      },
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
      },
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
    },
    '& .MuiInputBase-input': {
      color: theme.palette.mode === 'dark' ? theme.palette.grey[500] :  '#000',
      // background: "green", // This green background needs to be on the dropdown, adjust based on requirements
      padding: '0.75rem 0', // Adjust padding for height consistency
      fontSize: "1rem", // Match font size to Tailwind input field
      trasform: 'translateY("0.5rem")',
    },
    '.dark &': {
      backgroundColor: theme.palette.third,
      borderWidth: 0,
      color: theme.palette.grey[300],
    },
}));

export default CustomTextField;
