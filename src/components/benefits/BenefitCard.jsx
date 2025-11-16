import React from 'react'
import { Card, CardContent, Typography, Button, Chip, Box } from '@mui/material'
import { Link } from 'react-router-dom'

function BenefitCard({ benefit }) {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          {benefit.title}
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Chip 
            label={benefit.type === 'federal' ? 'Федеральная' : 'Коммерческая'} 
            color={benefit.type === 'federal' ? 'primary' : 'secondary'}
            size="small"
          />
        </Box>
        
        <Typography variant="body2" color="text.secondary" paragraph>
          {benefit.requirements}
        </Typography>
        
        <Typography variant="caption" display="block" sx={{ mt: 'auto' }}>
          Срок: {benefit.valid_from} - {benefit.valid_to}
        </Typography>
      </CardContent>
      
      <Button 
        component={Link} 
        to={`/benefit/${benefit.id}`}
        variant="contained" 
        sx={{ m: 1 }}
      >
        Подробнее
      </Button>
    </Card>
  )
}

export default BenefitCard
