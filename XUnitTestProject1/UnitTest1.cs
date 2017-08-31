using System;
using Xunit;

namespace XUnitTestProject1
{
    public class UnitTest1
    {
        [Fact]
        public void Test1()
        {
            Assert.Equal(1, 2);
        }

        public void Test2()
        {
            Assert.Equal(1, 1);
        }
    }
}
