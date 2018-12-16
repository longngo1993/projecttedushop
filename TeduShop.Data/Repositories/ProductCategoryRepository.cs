﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TeduShop.Data.Infrastructure;
using TeduShop.Model.Models;
using static TeduShop.Data.Repositories.ProductCategoryRepository;

namespace TeduShop.Data.Repositories
{
   public class ProductCategoryRepository : RepositoryBase<ProductCategory>, IProductCategoryRepository
    {
        public interface IProductCategoryRepository
        {
            IEnumerable<ProductCategory> GetByAlias(string alias);
        }
        public ProductCategoryRepository(IDbFactory dbFactory) : base(dbFactory)
        {

        }

        public IEnumerable<ProductCategory> GetByAlias(string alias)
        {
            return DbContext.ProductCategories.Where(x => x.Alias == alias);
        }
    }
}
