import React, { useState } from 'react'
import { Container, Typography } from '@mui/material'
import BenefitsList from '../components/benefits/BenefitsList'
import SearchBar from '../components/ui/SearchBar'
import Filters from '../components/ui/Filters'
import { filterBenefits } from '../utils/filters'
import benefitsData from '../data/benefits.json'

function Catalog() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    type: 'all',
    category: 'all'
  })

  const filteredBenefits = filterBenefits(benefitsData.benefits, searchTerm, filters)

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Каталог льгот
      </Typography>
      
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <Filters filters={filters} onFiltersChange={setFilters} />
      
      <Typography variant="body1" sx={{ mb: 2 }}>
        Найдено льгот: {filteredBenefits.length}
      </Typography>

      <BenefitsList benefits={filteredBenefits} />
    </Container>
  )
}

export default Catalog
